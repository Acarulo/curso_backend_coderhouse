class Usuario {
    
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(mascota) {
        this.mascotas.push(mascota);
    }

    countMascotas() {
        return this.mascotas.length;
    }

    addBook(nombre, autor) {
        this.libros.push({nombre: nombre, autor: autor});
    }

    getBookNames() {
        let names = [];
        for (let i = 0; i < this.libros.length; i++) {
            names.push(this.libros[i]["nombre"]);
        }

        return names;
    }
}

let usuario = new Usuario("Oscar", "Gomez", [{nombre: "Orgullo y prejuicio", autor: "Jane Austen"}], ["Hamster", "Gato"]);

console.log(usuario);
console.log("El usuario se llama:", usuario.getFullName());

usuario.addMascota("Perro");
console.log(usuario.mascotas);
console.log(usuario.countMascotas());

usuario.addBook("Fahrenheit 451", "Ray Bradbury");
usuario.addBook("Rebelion en la granja", "George Orwell");
console.log(usuario.getBookNames());