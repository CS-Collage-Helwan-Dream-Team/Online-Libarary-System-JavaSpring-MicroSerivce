package com.example.demo.Sub.services;

import com.example.demo.Sub.Repository.SubscriberRepository;
import com.example.demo.Sub.Request.SubscriberRequest;
import com.example.demo.Sub.models.SubModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;

@Service
public class SubscriptionService {
    @Autowired
    private SubscriberRepository subscriberRepository;





//////////////   Main //////////////////

    public void addSubscriber(SubscriberRequest subscriberRequest) {
        SubModel subscriber = new SubModel();
        subscriber.setUserId(subscriberRequest.getUserId());
        subscriber.setPaymentId(subscriberRequest.getPaymentId());
        subscriber.setStartDate(subscriberRequest.getStartDate());
        subscriberRepository.save(subscriber);
    }



//////////////   Main //////////////////
    public Integer checkSubscriber(int userId) {

        if (! isSubscriber(userId)) {
            return -1;
        }
        if (! isStillSubscriber(userId)){

            return 0 ;
        }


        return 1;

    }






//////////////////  sub //////////////////////
    public Boolean isStillSubscriber(int userId) {

        Period period = compareDatesFunc(userId);

        if (period.getMonths() >= 1) {
            return false;
        }

            return true ;
    }


    //////////////////  sub //////////////////////

    public Boolean isSubscriber(int userId) {
        SubModel lastSubscription =lastSubscriptionFunc(userId);

        if (lastSubscription == null) {
            return false;
        }
        return true;
    }

//////////////////  sub //////////////////////

    private SubModel  lastSubscriptionFunc(int userId){
        SubModel lastSubscription = subscriberRepository.findTopByUserIdOrderByStartDateDesc(userId);

        return lastSubscription;
    }



//////////////////  sub //////////////////////

    private Period compareDatesFunc(int userId){
        LocalDate lastSubscriptionDate = lastSubscriptionFunc(userId).getStartDate() ;
        LocalDate currentDate = LocalDate.now();
        Period period = Period.between(lastSubscriptionDate, currentDate);

        return period;
    }

}






