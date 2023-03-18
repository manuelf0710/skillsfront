export interface Persona {
  id: number;
  codigo_persona: String;
  nombre_persona: String;
  apellido_persona: String;
  correo_corporativo: String;
  correo_personal: String;
  pais: String;
  ciudad: String;
  estado: number;
  fecha_retiro: Date;
  estado_laboral_desc: String;
  fecha_ingreso: Date;
  fecha_nacimiento: Date;
  genero: String;
  ciudad_residencia: String;
  estado_civil: number;
  cantidad_hijos: number;
  direccion_residencia: String;
  practicas?: any[];
  proyectos?: any[];
  skills?: any[];
  roles?: any[];
}
