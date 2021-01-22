import { container } from 'tsyringe';

import IStorageProvider from './storageProvider/models/IStorageProvider';
import DiskStorageProvider from './storageProvider/implementations/DiskStorageProvider';

import EtherealMailProvider from './mailProvider/implementations/EtherealMailProvider';
import IMailProvider from './mailProvider/models/IMailProvider';

// import IMailTemplateProvider from './mailTemplateProvider/models/IMailTemplateProvider';
// import HandlebarsMailTemplateProvider from './mailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider(),
);

// container.registerSingleton<IMailTemplateProvider>(
//   'MailTemplateProvider',
//   HandlebarsMailTemplateProvider,
// );
