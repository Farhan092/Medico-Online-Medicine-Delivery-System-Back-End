import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<h1>hello shahriar</h1>';
  }

  getmyHello(): object {
    return {message: 'hello'};
  }

  removeMe(): object{

    return {message: ' hi world'};

  }

  addMe(): object{

    return {message: ' added '};

  }

  deleteMe(): object{

    return {message: ' deleted '};

  }

  delMe(): object{

    return {message: ' del '};

  }
}
