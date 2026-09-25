import { Request, Response, NextFunction } from 'express';
import { PersonService } from '../services/person.service.js';

export class PersonController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, salary, approved } = req.body;

      if (!name || salary === undefined) {
        return res.status(400).json({ error: 'Nome e salário são obrigatórios.' });
      }

      const person = await PersonService.create({
        name,
        salary: Number(salary),
        approved: Boolean(approved),
      });

      return res.status(201).json({
        message: 'Pessoa inserida com sucesso!',
        data: person,
      });
    } catch (error) {
      return next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const people = await PersonService.findAll();
      return res.status(200).json(people);
    } catch (error) {
      return next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const person = await PersonService.findById(id);

      if (!person) {
        return res.status(404).json({ message: 'Usuário não encontrado!' });
      }

      return res.status(200).json(person);
    } catch (error) {
      return next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, salary, approved } = req.body;

      const existing = await PersonService.findById(id);
      if (!existing) {
        return res.status(404).json({ message: 'Usuário não encontrado!' });
      }

      const updated = await PersonService.update(id, { name, salary, approved });
      return res.status(200).json({
        message: 'Usuário atualizado com sucesso!',
        data: updated,
      });
    } catch (error) {
      return next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const existing = await PersonService.findById(id);

      if (!existing) {
        return res.status(404).json({ message: 'Usuário não encontrado!' });
      }

      await PersonService.delete(id);
      return res.status(200).json({ message: 'Usuário removido com sucesso!' });
    } catch (error) {
      return next(error);
    }
  }
}
