# :speech_balloon: InstaChat

InstaChat is WhatsApp like chat application built with React Native, TypeScript, GraphQL, Prisma and PostgreSQL.

#### This project is currently in dev process...Below is the list of features completed and ToDos, please stay tuned for updates. Also, see the demo pictures to get an idea.

### :point_right: Features Completed:
:white_check_mark: Login

:white_check_mark: SignUp

:white_check_mark: Register a New User

:white_check_mark: Chat Group List with member count

:white_check_mark: Create a new Chat Group

:white_check_mark: Instant Chat with Group Members (Optimized with GraphQL Apollo InMemoryCache)

:white_check_mark: Display text message time in Chat Room

### :point_right: Features in Development (Coming soon...)

:black_square_button: Forgot Password

:black_square_button: Display Last Message and user profile in the chat list page (Just like Whatsapp)

:black_square_button: Add a group profile picture

:black_square_button: Search chat group and user

:black_square_button: Delete a message in chat room

### :point_right: To Run

1) Change the end point in prisma.yml and deploy "InstaChat-Prisma" to Docker.

docker-compose up -d

prisma deploy

2) In "InstaChat-GraphQL-server"

Get the prisma type defs using command "graphql get-schema -p prisma"

Update endpoit in prisma.js (Point to prisma server)

Run Node server using "node start.js"

3) Open "InstaChat-ReactNative-client"

Change httpUri in httpUri.ts (It should point to your node server, if localhost the your computer's IP address)

expo start

## :point_right: Demo

<p float="left">
  <img src="https://user-images.githubusercontent.com/29627276/71787737-7da3e580-2fe9-11ea-892c-01d8afcaa2fd.jpg" width="285" height="500" />
  <img src="https://user-images.githubusercontent.com/29627276/71787736-7da3e580-2fe9-11ea-9ae3-e3f933f1b38a.jpg" width="285" height="500" />
   <img src="https://user-images.githubusercontent.com/29627276/71787978-f4da7900-2feb-11ea-8e5a-dcc01f6d422f.jpg" width="285" height="500" />
  <img src="https://user-images.githubusercontent.com/29627276/71787977-f4da7900-2feb-11ea-8c80-965c322605de.jpg" width="285" height="500" />
<img src="https://user-images.githubusercontent.com/29627276/71787735-7da3e580-2fe9-11ea-87c5-a59e68938213.jpg" width="285" height="500" />
<img src="https://user-images.githubusercontent.com/29627276/71787738-7da3e580-2fe9-11ea-8223-de8e983121ba.jpg" width="285" height="500" />
  </p>

