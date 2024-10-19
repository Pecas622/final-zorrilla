import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD8_SWuxYRTWcxUFIpe2UvG8brz6NgqvYI",
    authDomain: "tradicion-mate-912.firebaseapp.com",
    projectId: "tradicion-mate-912",
    storageBucket: "tradicion-mate-912.appspot.com",
    messagingSenderId: "135688425791",
    appId: "1:135688425791:web:d0f81a518cb8f7e0dc438a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

// import { collection, doc, writeBatch } from "firebase/firestore"


// const misProductos = [
//     {
//         id: 1,
//         nombre: "Imperial Labrado",
//         stock: 10,
//         precio: 3500,
//         img: "/img/imperial labrado.jpg",
//         idCat: "Mates",
//         descripcion: "Mate Imperial Labrado, con base de cuero y detalles grabados a mano, ideal para un mate tradicional."
//     },
//     {
//         id: 2,
//         nombre: "Rei Verde Padrón Argentino 1kg",
//         stock: 15,
//         precio: 800,
//         img: "/img/Rei Verde Padron Argentino 1kg.jpg",
//         idCat: "Yerbas",
//         descripcion: "Yerba mate Rei Verde Padrón Argentino de 1kg, cultivada orgánicamente, con sabor suave y equilibrado."
//     },
//     {
//         id: 3,
//         nombre: "Imperial Pulido con Base",
//         stock: 8,
//         precio: 2500,
//         img: "/img/Imperial pulido con base.jpg",
//         idCat: "Mates",
//         descripcion: "Mate Imperial Pulido con base, tallado a mano, resistente y duradero para largas jornadas de mate."
//     },
//     {
//         id: 4,
//         nombre: "Bombillón Clásico Alpaca Campeones",
//         stock: 20,
//         precio: 600,
//         img: "/img/Bombillon clasico alpaca Campeones.webp",
//         idCat: "Accesorios",
//         descripcion: "Bombillón clásico de alpaca, diseño Campeones, ideal para un filtrado perfecto y un mate suave."
//     },
//     {
//         id: 5,
//         nombre: "Yerba Canarias Tradicional",
//         stock: 12,
//         precio: 900,
//         img: "/img/Yerba Canarias Tradicional.jpg",
//         idCat: "Yerbas",
//         descripcion: "Yerba mate Canarias Tradicional, famosa por su sabor fuerte y amargo, perfecta para los amantes del mate robusto."
//     },
//     {
//         id: 6,
//         nombre: "Camionero",
//         stock: 7,
//         precio: 3000,
//         img: "/img/camionero.jpeg",
//         idCat: "Mates",
//         descripcion: "Mate Camionero de cerámica, resistente, con un diseño robusto y cómodo para llevar a todos lados."
//     },
//     {
//         id: 7,
//         nombre: "Termo Media Manija",
//         stock: 5,
//         precio: 7000,
//         img: "/img/Termo media manija.webp",
//         idCat: "Accesorios",
//         descripcion: "Termo media manija, práctico y resistente, con capacidad ideal para disfrutar de un buen mate durante todo el día."
//     },
//     {
//         id: 8,
//         nombre: "Yerba Playadito Despalada",
//         stock: 20,
//         precio: 850,
//         img: "/img/yerba playadito despalada.jpeg",
//         idCat: "Yerbas",
//         descripcion: "Yerba mate Playadito Despalada, con menos polvo, ideal para un mate más suave y liviano."
//     }
// ];



// const subirProductos = async () => {

//     const batch = writeBatch(db)

//     const productosRef = collection(db, "productos")

//     misProductos.forEach((producto) => {

//         const nuevoDoc = doc(productosRef) //crea un nuevo dociumento con un ID automatico

//         batch.set(nuevoDoc, producto)// Agrega la operacion de escritura al batch

//     })

//     try {

//         await batch.commit();

//         console.log("Productos subidos exitosamente")

//     } catch (error) {

//         console.log("Error subiendo productos:", error)

//     }

// }

// subirProductos()
