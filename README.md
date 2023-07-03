# ApartmentRatings

### ApartmentRatings is a backend API made with MongoDB to hold data in raltaion to apartments and ratings of the apartments

This program allows users to store and retirieve data that would be used in relation to a website that collects and displays reviews for different apartments complexes.


## Endpoints 

### `GET /`
* returns all apartment objects currently stored in the database  
  
  Body{ }


### `GET /apartment/:id`
* returns all reviews of a specific apartment  
  
  Body{  
"id": XXX,    
}

### `POST /new`  
* posts a new review to the apartment specified in the body   
  
  Body{  
"apartmentId": XXX,  
"review": XXX,  
"user": XXX,  
"price": XXX,  
}  

### `POST /newApartment`
* posts a new apartment object in accordance to the information passed in the body  
  
  Body{  
"name": XXX,  
"description": XXX,  
"posterPath": XXX,  
}

### `DELETE /reviews/:id`  
* deletes a specific review    
  
  Body{    
"apartmentId": XXX,  
}

### `DELETE /apartment/delete/:id`
* deletes a specific apartments along with its reviews    
  
  Body{ }   

### `DELETE /apartment/delete`
* deletes all apartments currently stored in the database  
  
  Body{ }  

