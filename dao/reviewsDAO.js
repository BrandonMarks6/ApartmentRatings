import { ObjectId } from 'mongodb';

let reviews

export default class ReviewsDAO {
    static async injectDB(conn) {//gets a connection
        if (reviews) {//stops if already connected
            return
        }
        try {
            reviews = await conn.db("reviews").collection("reviews")//gets the entire review databse then gets the collectcion of reviews 
        } catch (e) {
            console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
        }


    static async addReview(apartmentId, user, review, price) {
        try {
            const reviewDoc = {
                apartmentId: apartmentId,
                user: user,
                review: review,
                price: price,
            };

    
            // Retrieve the apartment document and handle existing reviewsArray
            const currentApartment = await reviews.findOne({ _id: new ObjectId(apartmentId) });
            let existingReviews = currentApartment.reviewsArray;
                
            // Create the new reviews array with the existing reviews and the new review
            const newReviews = [...existingReviews, reviewDoc];

            //increments total reviews by one
            let oldTotalReviews = currentApartment.totalReviews;
            let newTotalReviews = oldTotalReviews + 1;

            //will find the neew average price of the apartment
            let oldAveragePrice = currentApartment.averagePrice;
            let newAveragePrice = oldAveragePrice + ((price - oldAveragePrice) / newTotalReviews);


            // Update the apartment document with the new reviews array
            const updateResponse = await reviews.findOneAndUpdate(
                { _id: new ObjectId(apartmentId) },
                { $set: { reviewsArray: newReviews, totalReviews: newTotalReviews, averagePrice: newAveragePrice} },
                { returnOriginal: false }
            );
    
            return updateResponse;
        } catch (e) {
            console.error(`Unable to post review: ${e}`);
            return { error: e };
        }
    }
    

    static async deleteReview(reviewId, apartmentId) {
    try {
        // Retrieve the apartment document and handle existing reviewsArray
        const currentApartment = await reviews.findOne({ _id: new ObjectId(apartmentId) });

        //grabs current array of reviews
        let existingReviews = currentApartment.reviewsArray;
        //will hold new set of reviews after removing one
        let newReviews = new Array(existingReviews.length - 1)

        let removedReview;//holds the removed item in order to use its attributes
        let insertionIndex = 0

        //will add all but removed review to the new array
        for(let traversalIndex = 0; traversalIndex < existingReviews.length; traversalIndex++){
            if(traversalIndex != reviewId){
                newReviews[insertionIndex] = existingReviews[traversalIndex]
                insertionIndex++
            }
            else{
                removedReview = existingReviews[traversalIndex]
            }
        }        
        
        
        //decrements total reviews by one
        let oldTotalReviews = currentApartment.totalReviews;
        let newTotalReviews = oldTotalReviews - 1; 

        //removes the value of the price from the total price
        let oldAveragePrice = currentApartment.averagePrice;
        let newAveragePrice = 0;
        if(newTotalReviews == 0){
            newAveragePrice = -1
        }
        else{
            newAveragePrice = (oldAveragePrice * oldTotalReviews - removedReview.price) / (oldTotalReviews - 1)
        }
        
        
        //updates all necessary values
        const updateResponse = await reviews.findOneAndUpdate(
            { _id: new ObjectId(apartmentId) },
            { $set: { reviewsArray: newReviews, totalReviews: newTotalReviews, averagePrice: newAveragePrice} },
            { returnOriginal: false }
        );

        return updateResponse
    } catch (e) {
        console.error(`Unable to delete review: ${e}`)
        return { error: e }
    }
    }

    static async getReviewsByApartmentId(apartmentId) {
        try {
            const cursor = await reviews.findOne({ _id: new ObjectId(apartmentId) });

            //returns only the array of reviews stored inside of the currnet apartment object
            return cursor.reviewsArray
        } catch (e) {
            console.error(`Unable to get review: ${e}`)
            return { error: e }
        }
    }
    
    //possibly done
    static async getAllApartments() {
    try {
        const cursor = await reviews.find({})
        return cursor.toArray()
    } catch (e) {
        console.error(`Unable to get review: ${e}`)
        
        return { error: e }
    }
    }

    static async addApartment(name, description, posterPath, reviewsArray, averagePrice, totalReviews, averageRating) {
        try {
            const reviewDoc = {
                name: name,
                description: description,
                posterPath: posterPath,
                reviewsArray: reviewsArray,
                averagePrice: averagePrice,
                totalReviews: totalReviews,
                averageRating: averageRating
            }
            return await reviews.insertOne(reviewDoc)
            } catch (e) {
            console.error(`Unable to post review: ${e}`)
            return { error: e }
            }
    }

    static async deleteApartment(reviewId, apartmentId) {
        try {
            const deleteResponse = await reviews.deleteOne({ _id: new ObjectId(reviewId)})
            return deleteResponse
        } catch (e) {
            console.error(`Unable to delete review: ${e}`)
            return { error: e }
        }
        }


    static async deleteAllApartments() {
        try {
            const deleteResponse = await reviews.deleteMany({ })
            return deleteResponse
        } catch (e) {
            console.error(`Unable to delete review: ${e}`)
            return { error: e }
        }
        }

}