import { prisma, redis } from '../config/database.js';
import { AuditLog } from '../models/auditLog.model.js';

export interface CreatePersonInput {
  name: string;
  salary: number;
  approved?: boolean;
}

export interface UpdatePersonInput {
  name?: string;
  salary?: number;
  approved?: boolean;
}

const CACHE_KEY_PEOPLE = 'cache:people:all';

export class PersonService {
  static async create(input: CreatePersonInput) {
    const person = await prisma.person.create({
      data: {
        name: input.name,
        salary: input.salary,
        approved: input.approved ?? false,
      },
    });

    // Invalidate Redis cache
    try {
      await redis.del(CACHE_KEY_PEOPLE);
    } catch {
      // Redis optional fail-safe
    }

    // Write audit log to MongoDB asynchronously
    AuditLog.create({
      action: 'PERSON_CREATED',
      entityId: person.id,
      details: { name: person.name, salary: person.salary },
    }).catch(() => {});

    return person;
  }

  static async findAll() {
    // Try Redis cache first
    try {
      const cached = await redis.get(CACHE_KEY_PEOPLE);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch {
      // Redis fallback to DB
    }

    const people = await prisma.person.findMany({
      orderBy: { createdAt: 'desc' },
    });

    try {
      await redis.set(CACHE_KEY_PEOPLE, JSON.stringify(people), 'EX', 60); // 60s cache
    } catch {
      // Redis fail-safe
    }

    return people;
  }

  static async findById(id: string) {
    return prisma.person.findUnique({ where: { id } });
  }

  static async update(id: string, input: UpdatePersonInput) {
    const person = await prisma.person.update({
      where: { id },
      data: input,
    });

    try {
      await redis.del(CACHE_KEY_PEOPLE);
    } catch {}

    AuditLog.create({
      action: 'PERSON_UPDATED',
      entityId: person.id,
      details: input,
    }).catch(() => {});

    return person;
  }

  static async delete(id: string) {
    const deleted = await prisma.person.delete({ where: { id } });

    try {
      await redis.del(CACHE_KEY_PEOPLE);
    } catch {}

    AuditLog.create({
      action: 'PERSON_DELETED',
      entityId: id,
      details: { id },
    }).catch(() => {});

    return deleted;
  }
}
