import { createMainApp } from 'server/src/app';
import { runScript } from './tools/node-script';
import { UserService } from 'server/src/user/user.service';


runScript('add initial data', (async () => {
  const app = await createMainApp();
  const userService = app.get(UserService);


  await userService.create({
    name: 'admin',
    surname: 'admin',
    email: 'admin@admin.com',
    password: 'admin',
    isAdmin: true,
    educationData: [],
  });
}));
