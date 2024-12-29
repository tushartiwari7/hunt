# Use Case of this repo: 
this is a nodemailer where you will pass the data of Peoples(HR or Referrals) probably from apollo.io 's APIs. 
and we will send mail on behalf of you to those people for interview Opportunity.

# Steps to Run:
1. Go to Apollo.io
2. Search, Apply Filters based on company etc. and get list of people you want to send mail to.
3. Click on 'Access Email' for everyone one by one,
4. Apply any other filter just to hit the api once again and get list of people.
5. APOLLO API USED: `https://app.apollo.io/api/v1/mixed_people/search`
6. copy the `contacts` field Value from API Response.
7. Update the `./people.json` file with the value.
8. RUN `node people.js` to update Excel with the Name and Email.
9. Update Excel with other repetitive fields manually.
10. Verify the Excel.
11. Run `node nodemailer.js` to send Emails.