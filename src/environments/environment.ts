// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api/',
  server_root: 'http://localhost:8000',
  personas: {
    getPersonas: 'personas/search/',
    getSkillsByPersonaId: 'personas/skills/',
  },
  proyectos: {
    getProyectosSearch: 'proyectos/search',
  },
  roles: {
    getRolesSearch: 'roles/search',
  },
  skills: {
    getSkillsSearch: 'skills/search',
  },
  practicas: {
    getPracticasSearch: 'practicas/search',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
