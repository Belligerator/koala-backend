# NestJS backend for the Koala Technical Assessment

## About

This repository contains a backend for the Koala Technical Assessment. It is a REST API that provides endpoints for reading data (characters, nemeses, secrets) from the database. The most important endpoint is `/api/statistics` that returns statistics about the data in the database.

Backend is built using [NestJS](https://nestjs.com/), a NodeJS framework. It is a REST API that provides endpoints for the app to consume. Backend connects to Koala's example [PostgreSQL](https://www.postgresql.org/) database and interacts with it using [TypeORM](https://typeorm.io/).

## Known issues, what could be improved and what could be added

- Statistics are calculated from the data in the database. There are 3 calls to the database to get the data. One for retrieving characters statistics, one for retrieving nemesis statistics and one for retrieving array of characters with their nemeses. This could be improved by using a single query that would return all the data needed for the statistics. But query may be quite complex. It would be even better to create view in the database that would return the data needed for the statistics. Then the backend would only need to query the view.

- Logger, like winston, could be added to the backend. It would be useful for logging errors and other information into files.

- Backend could be smaller, but I wanted to prepare backend which is ready for future expansion.

- Gender, in database table `character` is of type `text`. It would be better to use `enum` type. And have predefined values. Now there are multiple values for one gender, eg. `[male, m, M]` for male.

- Unit test should be added.

## Demo

A demo of the backend can be found at https://koala.belligerator.cz/api/. The demo is running on a Docker container.

For that purpose I have created a docker image for the backend. The image is built using the Dockerfile in the root directory of this repository.

On the server, there is docker-compose file that is used to run the backend. The example file can be found in the root directory.

In the `/documentation` directory, there is a `Koala.postman_collection.json` file that contains a Postman collection with sample requests. You can import it into Postman and use it to test the endpoints.

You can also test the api with you browser. For example, you can try the following endpoints:

- https://koala.belligerator.cz/api/statistics
- https://koala.belligerator.cz/api/character
- https://koala.belligerator.cz/api/nemesis
- https://koala.belligerator.cz/api/secret

Example response from the `/api/statistics` endpoint (characters array is shortened):

```
{
  "count_characters": 11,
  "average_age_character": 39.91,
  "average_weight_characters": 104.03,
  "count_live_nemesis": 11,
  "average_age_nemesis": 127.3,
  "count_all": 22,
  "average_age_all": 83.605,
  "gender": {
    "male": 6,
    "female": 2,
    "other": 3
  },
  "characters": [
    {
      "id": 2,
      "name": "Trillian",
      "gender": "female",
      "ability": "mathematician",
      "minimal_distance": "6.2",
      "weight": "49",
      "born": "1994-12-14T00:00:00.000Z",
      "in_space_since": "2014-12-24T17:21:50.000Z",
      "beer_consumption": 6704,
      "knows_the_answer": true,
      "nemesis_list": [
        {
          "id": 1,
          "isAlive": true,
          "years": 29,
          "character_id": 2,
          "secret_list": [
            {
              "id": 2,
              "secret_code": "4168664804",
              "nemesis_id": 1
            }
          ]
        }
      ]
    },]}
```

## Documentation

Documentation for the endpoints (Swagger) can be found at https://koala.belligerator.cz/api/.
