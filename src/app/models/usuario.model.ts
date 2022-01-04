export  class Usuario{

  static fronFirebase({email, uid, nombre}:{ email:any, uid: any, nombre: any}){
    return new Usuario( uid, nombre, email );
  }
  constructor(
    public uid: string,
    public nombre: string,
    public email: string,
  ){}
}
