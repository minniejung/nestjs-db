import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../../common/db/entities/user.entity";
import { CreateUserDto } from "../dto/create-user.dto";

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findOne(options): Promise<User | undefined> {
    // Todo: findOne은 어떤 조건이 들어올지 몰라도 where절에 options를 통해 데이터를 조회해야 합니다.
    const user = await this.userRepository.findOne({ where: options });
    return user ?? undefined;
  }

  findAll(): Promise<User[]> {
    // Todo: findAll은 전체 데이터를 조회해야 합니다.
    return this.userRepository.find();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Todo: create은 유저 데이터를 생성해야 합니다.
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  countAll(): Promise<number> {
    // Todo: countAll은 전체 데이터의 개수를 조회해야 합니다.
    return this.userRepository.count();
  }

  async existsByUserId(userId: string): Promise<boolean> {
    // Todo: existsByUserId은 userId로 유저의 정보가 있는지 확인해야 합니다. 리턴은 boolean으로 해주세요.
    // return this.userRepository.exists({ where: { userId } });
    const count = await this.userRepository.count({ where: { userId } });
    return count > 0;
  }

  async update(
    userId: string,
    updateUserDto: Partial<CreateUserDto>
  ): Promise<User> {
    // Todo: update은 userId로 유저의 정보를 수정해야 합니다.
    const existingUser = await this.findOne({
      where: { userId },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const merged = this.userRepository.merge(existingUser, updateUserDto);
    return await this.userRepository.save(merged);

    // if (!existingUser) throw new Error(`User with ID ${userId} not found`);
    // await this.userRepository.update(existingUser.id, {
    //   email: updateUserDto.email,
    // });
    // const updatedUser = await this.findOne({ userId });
    // if (!updatedUser) throw new Error(`User with ID ${userId} not found`);
    // return updatedUser;
  }

  async delete(userId: string): Promise<void> {
    // Todo: delete은 userId로 유저의 정보를 삭제해야 합니다.
    await this.userRepository.delete({ userId });
  }
}
