import { isPlatformBrowser } from '@angular/common';
import { ClassProvider, FactoryProvider, Injectable, InjectionToken, PLATFORM_ID, Provider } from '@angular/core';

export const STORAGE_JWT = 'jwt';

export const LOCAL_STORAGE: InjectionToken<Storage> = new InjectionToken('LocalStorageToken');

export abstract class LocalStorageRef {
  get nativeLocalStorage(): Storage | Object {
    throw new Error('Not implemented');
  }
}

@Injectable()
export class BrowserLocalStorageRef extends LocalStorageRef {
  constructor() {
    super();
  }

  get nativeLocalStorage(): Storage | Object {
    return localStorage;
  }
}

export const localStorageFactory: (
  browserLocalStorageRef: BrowserLocalStorageRef,
  platformID: Object
) => Storage | Object = (browserLocalStorageRef: BrowserLocalStorageRef, platformID: Object) => {
  if (isPlatformBrowser(platformID)) {
    return browserLocalStorageRef.nativeLocalStorage;
  }
  return {};
};

export const browserLocalStorageProvider: ClassProvider = {
  provide: LocalStorageRef,
  useClass: BrowserLocalStorageRef,
};

export const localStorageProvider: FactoryProvider = {
  provide: LOCAL_STORAGE,
  useFactory: localStorageFactory,
  deps: [LocalStorageRef, PLATFORM_ID],
};

export const LOCAL_STORAGE_PROVIDERS: Provider[] = [browserLocalStorageProvider, localStorageProvider];
