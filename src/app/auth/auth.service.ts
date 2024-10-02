import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseResponse from 'src/utils/response.utils';
import { Repository } from 'typeorm';
import { User } from './auth.entity';
import { RegisterDto, LoginDto } from './auth.dto';
import { ResponseSuccess } from 'src/interface';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService extends BaseResponse {
  constructor(
    @InjectRepository(User) private readonly authRepository: Repository<User>,
  ) {
    super();
  }

  async register(payload: RegisterDto): Promise<ResponseSuccess> {
    // memeriksa apakah email tersebut sudah ada atau belum
    const checkUserExist = await this.authRepository.findOne({
      where: {
        email: payload.email,
      },
    });
    if (checkUserExist) {
      throw new HttpException('email sudah digunakan', HttpStatus.FOUND);
    }
    // hash password
    payload.password = await hash(payload.password, 12);
    // hash password
    await this.authRepository.save(payload);
    return this._success('Register Berhasil');
  }

  async login(payload: LoginDto): Promise<ResponseSuccess> {
    const checkUserExists = await this.authRepository.findOne({
      where: {
        email: payload.email,
      },
      select: {
        id: true,
        nama: true,
        email: true,
        password: true,
        refresh_token: true,
      },
    });

    if (!checkUserExists) {
      throw new HttpException(
        'User tidak ditemukan',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const checkPassword = await compare(
      payload.password,
      checkUserExists.password,
    ); // compare password yang dikirim dengan password yang ada di tabel
    if (checkPassword) {
      return this._success('Login Success', checkUserExists);
    } else {
      throw new HttpException(
        'email dan password tidak sama',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}