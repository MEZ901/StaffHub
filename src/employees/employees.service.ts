import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    try {
      return await this.databaseService.employee.create({
        data: createEmployeeDto,
      });
    } catch (error) {
      throw new Error('Failed to create employee');
    }
  }

  async findAll(role: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    try {
      return role
        ? await this.databaseService.employee.findMany({ where: { role } })
        : await this.databaseService.employee.findMany();
    } catch (error) {
      throw new Error('Failed to fetch employees');
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.databaseService.employee.findUnique({
        where: { id },
      });

      if (!user) throw new NotFoundException('User Not Found');

      return user;
    } catch (error) {
      throw new Error('Failed to fetch employee');
    }
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      return await this.databaseService.employee.update({
        where: { id },
        data: updateEmployeeDto,
      });
    } catch (error) {
      throw new Error('Failed to update employee');
    }
  }

  async remove(id: number) {
    try {
      return await this.databaseService.employee.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error('Failed to delete employee');
    }
  }
}
