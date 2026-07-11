const API='http://localhost:3000';

export async function consultar(endpoint){
return fetch(API+endpoint);
}
