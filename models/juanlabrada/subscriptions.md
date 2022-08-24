
For each domain you can have different subscriptions options
Each subscription option can relate to a service (ex: Newsletter, Blog posts )
Each subscription option can have many subscribers
You can also unsubscribe
Each unsubscribe reference must include the subscriptionOptionId and/or subscriptionId

domain -> service
 -name       -domainId
 -ownerId    -name
             -description
             / \
              |
       -> subscriptionOptions<-subscriptions
              -serviceId           -subscriptionOptionId
              -name                -name
              -description         -email
                                   -startDate
                                   -endDate

