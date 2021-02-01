/* eslint-disable import/no-unresolved */
import { container } from 'tsyringe';

import mailConfig from '@config/mail';

import IStorageProvider from './storageProvider/models/IStorageProvider';
import DiskStorageProvider from './storageProvider/implementations/DiskStorageProvider';

import EtherealMailProvider from './mailProvider/implementations/EtherealMailProvider';
import SESMailProvider from './mailProvider/implementations/SESMailProvider';
import IMailProvider from './mailProvider/models/IMailProvider';

import IMailTemplateProvider from './mailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './mailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailConfig.driver === 'ethereal'
    ? container.resolve(EtherealMailProvider)
    : container.resolve(SESMailProvider),
);
