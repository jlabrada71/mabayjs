
For each domain you can have different subscriptions options
Each subscription option can relate to a service (ex: Newsletter, Blog posts )
Each subscription option can have many subscribers
You can also unsubscribe
Each unsubscribe reference must include the subscriptionOptionId and/or subscriptionId

domain -> projects
 -name       -name
 -ownerId      / \
                |
                Tasks
                  - projectId
                  - description 
                  - done
                  - subtasks
                      - description
                      - done

