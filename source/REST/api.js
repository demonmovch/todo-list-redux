import { MAIN_URL, TOKEN } from './config';

export const api = {
	fetch() {
    return fetch(MAIN_URL, {
      method: 'GET',
      headers: {
        Authorization: TOKEN,
      },
    });
	},	
	create(taskDescription){
    return fetch(MAIN_URL, {
      method: 'POST',
      headers: {
        Authorization: TOKEN,
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({ "message": taskDescription }),
    });		
	},
  remove(id){
    return fetch(`${MAIN_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: TOKEN,
      },
    });
  },
  update(task){
    return fetch(MAIN_URL, {
      method: 'PUT',
      headers: {
        Authorization: TOKEN,
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify([task]),
    });   
  },
}