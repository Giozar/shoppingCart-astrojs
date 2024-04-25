import { atom, map } from 'nanostores';
// Se crea y exporta una contante que con atom se le da un estado inicial false
export const isCartOpen = atom(false);

// Un type es un tipo de dato primitivo
// Se crea, declara y exporta un tipo de dato primitivo con las siguientes propiedades


export type CartItem = {
	id: string;
	name: string;
	imageSrc: string;
	quantity: number;
};

/**
 * Con type significa que crearemos un nuevo tipo de dato primitivo
 * Con Pick hacemos que de una type en este caso CartItem anteriormente creado,
 * Támbien puede ser igual un interface. Le decimos que de el type CartItem vamos
 * a crear uno tipo de dato primitivo que tendrá propiedades especificas del type indicado
 * que estamos haciendo referencia que es CartItem, en este caso le decimos que id, name, e imageSrc, que son
 * algunas de las propiedades originales de CartItem serán las del nuevo tipo de dato
 */
export type CartItemDisplayInfo = Pick<CartItem, 'id' | 'name' | 'imageSrc'>;



/**
 * Creamos y exportamos una constante que tendrá el siguiente valor
 * Empezamos a explicar desde adentro hacía afuera
 * con Record creamos un objeto, pero con la diferencia es que es un objeto
 * con propiedades especificas, le decimos create un objeto, pero no cualquier objeto
 * será un objeto que tendrá como propiedad un string y su valor será type CartItem
 * 
 * ej. {
 *  'propiedad1': { id: 1, name: 'producto', imageSrc: 'imagen.jpg, 'quantity': 1}
 * }
 * 
 * y con map le decimos que se cree un colección de clave valor, como un diccionario
 * clave valor, y la clave será un string y el valor será un CartItem
 *  'propiedad1': { id: 1, name: 'producto1', imageSrc: 'imagen.jpg, 'quantity': 3},
 *  'propiedad2': { id: 2, name: 'producto2', imageSrc: 'imagen.jpg, 'quantity': 2},
 *  'propiedad3': { id: 3, name: 'producto3', imageSrc: 'imagen.jpg, 'quantity': 1},
 */
export const cartItems = map<Record<string, CartItem>>({});


/**
 * Función que suma o añade más productos al carrito
 * Recibe un objeto con las siguintes propiedades
 * Que son del type CartItem
 * @param {{id, name, imageSrc}}
 */

export function addCartItem({ id, name, imageSrc }: CartItem) {
	// Intenta obtener el producto con el id pasado por parametro
	const existingEntry = cartItems.get()[id];
	// si existe 
	if (existingEntry) {
		// accede al valor del producto existente
		cartItems.setKey(id, {
			// se usa el operador spread para volver a instertar el producto existente con sus valores más recientes
			...existingEntry, // es cómo sustituir el objeto actual por el mismo, pero con sus datos actualizados
			// y se suma otro más a la cantidad del mismo producto
			quantity: existingEntry.quantity + 1,
		});
	} else {
		// de lo contrario se crea un nuevo producto
		cartItems.setKey(id, {
			id,
			name,
			imageSrc,
			quantity: 1,
		});
	}
}