# React TRPC AWS STARTER

New versions of Next.js often bting quite a lot of overkill and not all applications need server-side rendering.

The project is an experiement to build React.js + TRPC serverless application hosted on AWS. The project is also deployed by using Github Actions and has more advanced Eslint, Prettier setup.

## Environment variables

| Environment Variable    | Description                                                     |
| ----------------------- | --------------------------------------------------------------- |
| `BARECHECK_API_API_KEY` | Code coverage application setup.                                |
| `BARECHECK_APP_TOKEN`   | Cloud storage token from Barecheck.                             |
| `BARECHECK_WEB_API_KEY` | Cloud storage API key from Barecheck.                           |
| `DATABASE_URL`          | URL for database connection.                                    |
| `AWS_ACCESS_KEY_ID`     | AWS access key ID for cloud services.                           |
| `AWS_SECRET_ACCESS_KEY` | AWS secret access key for cloud services.                       |
| `APP_VERSION`           | Current application version. Short commit hash can be used here |
| `NODE_ENV`              | dev, stg, prd                                                   |
| `GOOGLE_CLIENT_ID`      | Google client ID for auth.                                      |
| `GOOGLE_CLIENT_SECRET`  | Google client Secret for auth.                                  |
| `GOOGLE_REDIRECT_URI`   | The URL here would be the same as your frontend URL             |
| `JWT_SECRET`            | JWT auth secret                                                 |

## Commands

- `NODE_ENV=prd sls create_domain` - Create domain Route53 records
- `NODE_ENV=prd sls create-cert` - Create certificates
