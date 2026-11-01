// Content for the Process page. Edit the text here; the page renders it as-is.
// Code blocks use "#" comments so every command explains itself.

export const STEPS = [
  {
    title: "Understand & plan",
    text: "Clarify the problem, users and success criteria. Break the work into small issues on a GitLab board so every change maps to a ticket.",
    tags: ["Requirements", "GitLab Issues"],
  },
  {
    title: "Design the architecture",
    text: "Sketch the data model, API contracts and service boundaries first, so the frontend, backend and AI pieces can be built in parallel.",
    tags: ["REST APIs", "DB schema", "Auth"],
  },
  {
    title: "Build in small branches",
    text: "Short-lived feature branches reviewed through merge requests. Backends in Spring Boot, FastAPI or Django; interfaces in React.",
    tags: ["Git", "Merge requests", "Code review"],
  },
  {
    title: "Test early",
    text: "Unit and API tests run on every push, so a broken change is caught in minutes instead of after release.",
    tags: ["Unit tests", "API tests", "Lint"],
  },
  {
    title: "Containerize",
    text: "Each service ships as a Docker image, so it runs the same on my machine, in CI and on the server.",
    tags: ["Docker", "Docker Compose"],
  },
  {
    title: "Ship with CI/CD",
    text: "A GitLab pipeline builds, tests and deploys automatically on every merge. No manual copying of files to servers.",
    tags: ["GitLab CI/CD", "Auto deploy"],
  },
  {
    title: "Run & improve",
    text: "Deploy to OCI, AWS or Netlify, watch logs and errors in CloudWatch, and feed what I learn back into the next small iteration.",
    tags: ["OCI", "AWS", "Netlify", "Logs"],
  },
];

export const GROUPS = ["All", "Containers & Linux", "Web server", "Cloud", "CI/CD", "Dev tools"];

// what / why: short bullet lists. blocks: titled code samples.
export const TOPICS = [
  {
    id: "docker",
    group: "Containers & Linux",
    title: "Docker",
    what: "Packages an app and everything it needs (runtime, libraries, config) into an image that runs the same everywhere.",
    why: [
      "Same image on my laptop, in CI and on the server, so no 'works on my machine'.",
      "Easy rollbacks: run the previous image tag.",
      "One command starts the whole stack (app + database) with Docker Compose.",
    ],
    blocks: [
      {
        title: "Dockerfile for a Spring Boot API",
        code: `# Build stage: compile the jar with Maven
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn -q package -DskipTests

# Run stage: small image with only the jar
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]`,
      },
      {
        title: "Everyday commands",
        code: `# Build an image from the Dockerfile in this folder
docker build -t myapp:1.0 .

# Run it in the background; map host port 8080 to container port 8080
docker run -d --name myapp -p 8080:8080 --restart unless-stopped myapp:1.0

# List running containers
docker ps

# Follow the logs live (Ctrl+C to stop following)
docker logs -f myapp

# Open a shell inside the running container
docker exec -it myapp sh

# Stop and remove the container
docker stop myapp && docker rm myapp

# Start every service in docker-compose.yml (rebuild images first)
docker compose up -d --build

# Remove unused containers, networks and dangling images
docker system prune -f`,
      },
      {
        title: "docker-compose.yml: app + database",
        code: `# one file describes the whole stack; "docker compose up" starts it
services:
  api:
    build: ./backend                  # build the image from this folder
    ports: ["4000:4000"]              # host:container
    environment:
      MONGODB_URI: mongodb://mongo:27017/app   # services reach each other by service name
    depends_on: [mongo]
    restart: unless-stopped

  mongo:
    image: mongo:8
    volumes: ["mongo-data:/data/db"]  # keep data when the container is recreated
    restart: unless-stopped

volumes:
  mongo-data:`,
      },
    ],
  },
  {
    id: "linux",
    group: "Containers & Linux",
    title: "Basic Linux commands",
    what: "Every server I deploy to runs Linux, so I manage it over SSH from the terminal.",
    why: [
      "Servers have no desktop: files, services and logs are all handled by commands.",
      "Fast debugging: read logs, check memory and disk, restart a service in seconds.",
    ],
    blocks: [
      {
        title: "Files and folders",
        code: `pwd                      # show the current folder
ls -la                   # list files, including hidden ones, with details
cd /var/www              # go to a folder (cd .. goes up one level)
mkdir -p app/logs        # create a folder (and parents if missing)
cp -r src backup         # copy a folder recursively
mv old.txt new.txt       # move or rename a file
rm -rf old-folder        # delete a folder for good (double-check the path!)
cat app.log              # print a file
tail -f app.log          # follow a log file as it grows
grep -rn "ERROR" .       # search for text in all files below here`,
      },
      {
        title: "Permissions, processes and system",
        code: `chmod +x deploy.sh           # make a script executable
chmod 400 key.pem            # private key readable only by me (SSH needs this)
sudo chown -R ubuntu:ubuntu app   # give the ubuntu user ownership of a folder
ps aux | grep java           # find a running process
kill -9 1234                 # force-stop process with id 1234
top                          # live CPU and memory usage (q to quit)
df -h                        # disk space, human readable
free -m                      # memory usage in MB
sudo apt update && sudo apt upgrade -y   # refresh and update packages
sudo systemctl status nginx  # is the service running?
sudo systemctl restart nginx # restart a service
sudo journalctl -u myapp -n 100 --no-pager   # last 100 log lines of a service`,
      },
      {
        title: "Remote access",
        code: `ssh -i key.pem ubuntu@203.0.113.10       # log in to a server with my key
scp -i key.pem app.jar ubuntu@203.0.113.10:/home/ubuntu/   # copy a file to the server
curl -I https://example.com               # check the response headers of a site`,
      },
    ],
  },
  {
    id: "nginx",
    group: "Web server",
    title: "Nginx",
    what: "A fast web server and reverse proxy that sits in front of my apps.",
    why: [
      "Serves the React build (static files) very efficiently.",
      "Reverse proxy: forwards /api requests to the backend, so the backend port is never exposed.",
      "Terminates HTTPS (free Let's Encrypt certificates) and can compress responses.",
      "One server can host several apps on different domains.",
    ],
    blocks: [
      {
        title: "Site config: React frontend + API proxy",
        code: `# /etc/nginx/sites-available/portfolio
server {
    listen 80;
    server_name example.com;

    # Serve the built React app
    root /var/www/portfolio/dist;
    index index.html;

    # Single-page app: unknown paths fall back to index.html
    location / {
        try_files $uri /index.html;
    }

    # Forward API calls to the backend running on port 8080
    location /api/ {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`,
      },
      {
        title: "Install, enable and secure",
        code: `sudo apt install nginx -y                  # install Nginx
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/   # enable the site
sudo nginx -t                              # test the config for mistakes BEFORE reloading
sudo systemctl reload nginx                # apply changes without dropping connections
sudo tail -f /var/log/nginx/error.log      # watch errors live

# Free HTTPS certificate (also sets up auto-renewal)
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d example.com        # issue the certificate and update the config`,
      },
    ],
  },
  {
    id: "ec2",
    group: "Cloud",
    title: "AWS EC2",
    what: "Virtual servers on AWS. I use them for backends and AI services that need full control of the machine.",
    why: [
      "Choose the size (CPU/RAM) and scale it up when traffic grows.",
      "Full root access: install Docker, Nginx or anything else.",
      "Security groups act as a firewall for the instance.",
    ],
    blocks: [
      {
        title: "Launch and deploy",
        code: `# 1. Console: launch an Ubuntu instance, create a key pair, download key.pem
# 2. Security group: allow 22 (SSH, my IP only), 80 (HTTP), 443 (HTTPS)

chmod 400 key.pem                          # protect the key file
ssh -i key.pem ubuntu@<public-ip>          # connect to the instance

# On the server: install Docker and run the app
sudo apt update && sudo apt install docker.io -y
sudo usermod -aG docker ubuntu             # run docker without sudo (log in again after)
docker run -d -p 8080:8080 --restart unless-stopped myrepo/myapp:latest`,
      },
      {
        title: "AWS CLI",
        code: `# List my instances with id, state and public IP
aws ec2 describe-instances \\
  --query "Reservations[].Instances[].[InstanceId,State.Name,PublicIpAddress]" \\
  --output table

aws ec2 stop-instances --instance-ids i-0abc123      # stop (no compute charge while stopped)
aws ec2 start-instances --instance-ids i-0abc123     # start it again`,
      },
    ],
  },
  {
    id: "lightsail",
    group: "Cloud",
    title: "AWS Lightsail",
    what: "AWS's simple virtual server with a fixed monthly price, a static IP and a built-in firewall.",
    why: [
      "Predictable cost, ideal for small apps, demos and bots.",
      "Much less setup than EC2: pick a blueprint, get a server.",
      "Easy upgrade path to EC2 when a project grows.",
    ],
    blocks: [
      {
        title: "Setup with the AWS CLI",
        code: `# List my Lightsail servers
aws lightsail get-instances

# Open HTTPS (443) in the instance firewall
aws lightsail open-instance-public-ports \\
  --instance-name my-app \\
  --port-info fromPort=443,toPort=443,protocol=TCP

# A static IP keeps the address the same after restarts
aws lightsail allocate-static-ip --static-ip-name my-app-ip
aws lightsail attach-static-ip --static-ip-name my-app-ip --instance-name my-app

# Then: ssh in, install Docker + Nginx, and deploy exactly as on EC2`,
      },
    ],
  },
  {
    id: "lambda",
    group: "Cloud",
    title: "AWS Lambda",
    what: "Run code without managing servers. AWS runs my function only when it is called.",
    why: [
      "Pay only for the time it runs; idle cost is zero.",
      "Scales automatically, great for webhooks, chatbots and background jobs.",
      "Pairs well with API Gateway, S3 events and Amazon Lex.",
    ],
    blocks: [
      {
        title: "A simple Python handler",
        code: `# lambda_function.py
import json

def handler(event, context):
    # 'event' holds the input; 'context' has runtime info
    name = event.get("name", "world")
    return {
        "statusCode": 200,
        "body": json.dumps({"message": f"Hello, {name}!"}),
    }`,
      },
      {
        title: "Deploy and test",
        code: `zip function.zip lambda_function.py        # package the code

# Create the function (the role must allow Lambda to write logs)
aws lambda create-function \\
  --function-name hello-fn \\
  --runtime python3.12 \\
  --role arn:aws:iam::<account-id>:role/lambda-basic-role \\
  --handler lambda_function.handler \\
  --zip-file fileb://function.zip

# After editing the code, upload the new version
aws lambda update-function-code --function-name hello-fn --zip-file fileb://function.zip

# Call it and read the result
aws lambda invoke --function-name hello-fn \\
  --payload '{"name":"Abhilash"}' --cli-binary-format raw-in-base64-out out.json
cat out.json

# Stream its logs
aws logs tail /aws/lambda/hello-fn --follow`,
      },
    ],
  },
  {
    id: "s3",
    group: "Cloud",
    title: "AWS S3 bucket",
    what: "Object storage for files: images, documents, build output, backups and model data.",
    why: [
      "Very durable and cheap storage for any file size.",
      "Pre-signed URLs let users upload or download without opening the bucket to the world.",
      "Can host a static site or trigger a Lambda when a file arrives.",
    ],
    blocks: [
      {
        title: "Common commands",
        code: `aws s3 mb s3://my-app-files                 # create a bucket (names are globally unique)
aws s3 ls                                   # list all buckets
aws s3 cp resume.pdf s3://my-app-files/     # upload one file
aws s3 sync ./dist s3://my-app-files --delete   # mirror a folder (and remove files deleted locally)
aws s3 ls s3://my-app-files --recursive     # list every object in the bucket

# Temporary download link that expires in 1 hour (bucket stays private)
aws s3 presign s3://my-app-files/resume.pdf --expires-in 3600

aws s3 rb s3://my-app-files --force         # delete the bucket and everything in it`,
      },
    ],
  },
  {
    id: "cloudwatch",
    group: "Cloud",
    title: "AWS CloudWatch",
    what: "Central place for logs, metrics and alarms of my AWS services.",
    why: [
      "See Lambda and app errors without logging in to a server.",
      "Alarms warn me (email via SNS) before users notice a problem.",
      "Metrics like CPU, latency and error rate show how a release behaves.",
    ],
    blocks: [
      {
        title: "Logs and alarms",
        code: `aws logs describe-log-groups                # list log groups

# Follow the last hour of a Lambda's logs live
aws logs tail /aws/lambda/hello-fn --since 1h --follow

# Find only the error lines
aws logs filter-log-events \\
  --log-group-name /aws/lambda/hello-fn \\
  --filter-pattern "ERROR"

# Alarm: notify me when EC2 CPU stays above 80% for 10 minutes
aws cloudwatch put-metric-alarm \\
  --alarm-name high-cpu \\
  --namespace AWS/EC2 --metric-name CPUUtilization \\
  --dimensions Name=InstanceId,Value=i-0abc123 \\
  --statistic Average --period 300 --evaluation-periods 2 \\
  --threshold 80 --comparison-operator GreaterThanThreshold \\
  --alarm-actions arn:aws:sns:<region>:<account-id>:alerts`,
      },
    ],
  },
  {
    id: "bedrock",
    group: "Cloud",
    title: "AWS Bedrock",
    what: "Managed access to foundation models (such as Claude) through one AWS API.",
    why: [
      "No GPU servers to run; I call a model like any other AWS service.",
      "Data stays inside my AWS account, with IAM permissions and logging.",
      "Powers my agents, RAG systems and voice bots.",
    ],
    blocks: [
      {
        title: "Call a model from Python",
        code: `import boto3

# Client for the Bedrock runtime in my region
client = boto3.client("bedrock-runtime", region_name="us-east-1")

response = client.converse(
    modelId="<model-id>",  # use a model that is enabled in my account
    messages=[{"role": "user", "content": [{"text": "Summarise RAG in one line."}]}],
    inferenceConfig={"maxTokens": 300, "temperature": 0.2},  # short, focused answer
)

# The reply text sits inside the first content block
print(response["output"]["message"]["content"][0]["text"])`,
      },
      {
        title: "Check available models",
        code: `# List the models I can use in this region
aws bedrock list-foundation-models --region us-east-1 \\
  --query "modelSummaries[].modelId"`,
      },
    ],
  },
  {
    id: "oci",
    group: "Cloud",
    title: "OCI (Oracle Cloud)",
    what: "Oracle Cloud Infrastructure. I deploy my full-stack projects on an OCI virtual machine.",
    why: [
      "Generous Always Free tier, so personal and demo projects cost almost nothing.",
      "A normal Linux VM: the same Docker + Nginx setup works as anywhere else.",
      "Networking (VCN) and firewall rules are fully configurable.",
    ],
    blocks: [
      {
        title: "How I deploy a project on OCI, step by step",
        code: `# 1. OCI console: create a Compute instance (Ubuntu), download the SSH key
# 2. Networking: VCN > Security List > add ingress rules for ports 80 and 443
# 3. Connect to the VM
chmod 400 oci-key.key
ssh -i oci-key.key ubuntu@<public-ip>

# 4. OCI images also block traffic inside the OS: open 80 and 443 there too
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT
sudo netfilter-persistent save             # keep the rules after a reboot

# 5. Install Docker and Nginx
sudo apt update && sudo apt install docker.io docker-compose-v2 nginx -y
sudo usermod -aG docker ubuntu

# 6. Pull the image built by the pipeline and start the stack
docker compose pull
docker compose up -d

# 7. Point Nginx at the app, test it, then add HTTPS
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d example.com`,
      },
      {
        title: "OCI CLI (optional)",
        code: `# List the instances in my compartment
oci compute instance list --compartment-id <compartment-ocid> --output table`,
      },
    ],
  },
  {
    id: "claude-code",
    group: "Dev tools",
    title: "Claude Code",
    what: "Anthropic's AI coding agent that runs in the terminal. It reads my project, edits files and runs commands while I review each step.",
    why: [
      "Understands a whole repository, so questions and changes are not limited to one file.",
      "Good for refactors, tests, bug hunting and code review, with every change shown before it is applied.",
      "A CLAUDE.md file in the repo gives it my project's rules, so results match the codebase's style.",
    ],
    blocks: [
      {
        title: "Everyday use",
        code: `# start Claude Code inside the project folder
claude

# ask one question and print the answer (no interactive session)
claude -p "explain what the services folder does"

# pick up the most recent conversation in this folder
claude --continue

# inside a session:
#   /init     create a CLAUDE.md that describes the project
#   /clear    start a fresh conversation
#   /compact  summarise a long conversation to save context`,
      },
    ],
  },
  {
    id: "claude-desktop",
    group: "Dev tools",
    title: "Claude Desktop",
    what: "The Claude desktop app for chat, analysing files and screenshots, and running coding sessions with a visual interface.",
    why: [
      "Quick place to plan a feature, compare designs or sanity-check an architecture before writing code.",
      "I can drop in screenshots, PDFs and logs and ask what is wrong.",
      "Connectors let it work with other tools, and coding sessions keep a clear list of changes to review.",
    ],
    blocks: [],
  },
  {
    id: "vscode",
    group: "Dev tools",
    title: "VS Code",
    what: "My main code editor for React, TypeScript, Node.js and Python projects.",
    why: [
      "Fast, with a huge extension library and a built-in terminal and Git view.",
      "Debugger, search and refactoring across the whole project.",
      "Remote SSH lets me edit files directly on a Lightsail, EC2 or OCI server.",
    ],
    blocks: [
      {
        title: "Handy commands",
        code: `code .                                   # open the current folder in VS Code
code --install-extension dbaeumer.vscode-eslint   # install an extension from the terminal
code --diff old.js new.js                # compare two files side by side

# shortcuts (Windows / Linux)
#   Ctrl+P          open any file by name
#   Ctrl+Shift+P    command palette
#   Ctrl+\`          toggle the terminal`,
      },
    ],
  },
  {
    id: "antigravity",
    group: "Dev tools",
    title: "Antigravity",
    what: "Google's agent-first coding IDE, built on the VS Code experience, where AI agents can plan, write and test code across the editor, terminal and browser.",
    why: [
      "A second opinion next to my main workflow: I can give an agent a task and review what it did.",
      "Handy for scaffolding a feature or trying an approach quickly before I commit to it.",
      "Familiar VS Code-style interface, so my settings and habits carry over.",
    ],
    blocks: [],
  },
  {
    id: "openclaw",
    group: "Dev tools",
    title: "OpenClaw",
    what: "An open-source AI agent that runs on my own machine or server and can use tools and skills to carry out tasks, reachable from chat apps.",
    why: [
      "Lets me prototype agent behaviour quickly: give it tools, a goal and a chat channel, then watch what it does.",
      "Runs under my control, so I decide which files, accounts and tools it can touch.",
      "A useful comparison point for the agents I build with LangGraph for production work.",
    ],
    blocks: [],
  },
  {
    id: "git",
    group: "CI/CD",
    title: "Git & GitHub",
    what: "Git tracks every change to my code; GitHub (and GitLab) host the repositories, reviews and automation.",
    why: [
      "Every change is saved, reviewable and reversible.",
      "Branches and pull requests let me build a feature safely and have it reviewed before it reaches main.",
      "GitHub hosts my public work; GitLab runs the CI/CD pipelines for client projects.",
    ],
    blocks: [
      {
        title: "Daily workflow",
        code: `git clone https://github.com/<user>/<repo>.git   # copy a repository to my machine
git switch -c feature/login                       # start a new branch for one piece of work
git status                                        # what changed?
git add .                                         # stage all changes
git commit -m "Add login form validation"         # save them with a clear message
git push -u origin feature/login                  # publish the branch, then open a pull request

git pull --rebase origin main                     # bring in the latest main before merging
git log --oneline -10                             # last 10 commits, one line each
git restore src/App.jsx                           # throw away uncommitted edits to a file`,
      },
    ],
  },
  {
    id: "google-play",
    group: "CI/CD",
    title: "Google Play Store",
    what: "Where I publish Android apps. Releases go through the Play Console: signed bundle, testing track, then production.",
    why: [
      "Reaches Android users through the official store, with automatic updates.",
      "Testing tracks (internal, closed, open) let me check a build with real devices before everyone gets it.",
      "Staged rollouts and release notes make updates low-risk.",
    ],
    blocks: [
      {
        title: "Sign and build a release bundle",
        code: `# one-time: create the upload key (keep this file and its passwords safe, never commit them)
keytool -genkeypair -v -keystore upload-keystore.jks \\
  -alias upload -keyalg RSA -keysize 2048 -validity 10000

# build the signed Android App Bundle (.aab) for the store
./gradlew bundleRelease

# the file to upload:
# app/build/outputs/bundle/release/app-release.aab`,
      },
      {
        title: "Release steps in the Play Console",
        code: `# 1. Create the app: name, language, free or paid, privacy policy URL
# 2. Fill in the store listing: description, icon, screenshots, feature graphic
# 3. Complete App content: data safety, content rating, target audience
# 4. Testing > Internal testing > Create release > upload the .aab > add testers
# 5. Check the build on real devices, fix issues, upload a new bundle with a higher versionCode
# 6. Production > Create release > upload the .aab > add release notes > roll out (start with 10-20%)`,
      },
    ],
  },
  {
    id: "gitlab",
    group: "CI/CD",
    title: "GitLab CI/CD",
    what: "A pipeline that runs automatically on every push: lint, test, build the image and deploy.",
    why: [
      "Releases are repeatable; nobody deploys by hand.",
      "Broken code is caught before it reaches production.",
      "Secrets (SSH key, registry tokens) live in GitLab CI/CD variables, never in the repo.",
    ],
    blocks: [
      {
        title: ".gitlab-ci.yml (simplified)",
        code: `stages: [lint, test, build, deploy]

lint:
  stage: lint
  image: node:20
  script:
    - npm ci
    - npm run lint          # fail fast on style problems

test:
  stage: test
  image: node:20
  script:
    - npm ci
    - npm test              # unit and API tests must pass

build:
  stage: build
  image: docker:24
  services: [docker:24-dind]
  script:
    # log in to the GitLab registry, build and push an image tagged with the commit
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA

deploy:
  stage: deploy
  script:
    # SSH into the server and restart the stack with the new image
    - ssh -o StrictHostKeyChecking=no ubuntu@$SERVER_IP "cd app && docker compose pull && docker compose up -d"
  environment: production
  only: [main]              # deploy only from the main branch`,
      },
    ],
  },
];

// How each project reaches production. Edit to match what you actually use.
export const DEPLOYMENTS = [
  {
    project: "CareDesk: Dashboard & Voice Bot",
    stack: "React, TypeScript, Node.js, MongoDB, Exotel, Sarvam AI",
    steps: [
      "Push to GitLab; the pipeline lints, tests and builds Docker images.",
      "Docker Compose runs the API, web app and MongoDB on an AWS Lightsail server.",
      "Caddy adds automatic HTTPS; Exotel connects to the voice WebSocket.",
      "Agent traces are checked in LangSmith and call outcomes in the dashboard call log.",
    ],
  },
  {
    project: "DealerDesk: Dashboard & WhatsApp Bot",
    stack: "React, Node.js, MongoDB, Meta WhatsApp Cloud API",
    steps: [
      "Push to GitLab; the pipeline builds Docker images and runs tests.",
      "The stack is deployed on an OCI virtual machine with Docker Compose.",
      "Nginx serves the React app, proxies /api and terminates HTTPS.",
      "Meta sends WhatsApp events to the signed webhook endpoint on the same server.",
    ],
  },
  {
    project: "Android apps",
    stack: "Google Play Store, Gradle",
    steps: [
      "Build a signed Android App Bundle (.aab) with the release upload key.",
      "Upload it to the Play Console internal testing track and check it on real devices.",
      "Promote the same build to production with release notes and a staged rollout.",
    ],
  },
  {
    project: "Gaming Needs",
    stack: "Spring Boot, React, MySQL",
    steps: [
      "Push to GitLab; the pipeline tests the API and builds a Docker image.",
      "The image is deployed on an OCI VM with Docker Compose (API + MySQL).",
      "Nginx proxies /api to Spring Boot and serves HTTPS.",
      "The React frontend is built and deployed to Netlify.",
    ],
  },
  {
    project: "React apps (Currency, To Do, Colour Switcher, Password Generator)",
    stack: "React + Vite",
    steps: [
      "Build with npm run build; the output is a static dist folder.",
      "Netlify builds on every push to main and serves the site on its CDN.",
      "SPA redirect in netlify.toml sends every route to index.html.",
    ],
  },
  {
    project: "Semantic Search (RAG)",
    stack: "Python, Weaviate, Ollama",
    steps: [
      "Weaviate runs in Docker next to the app; Ollama serves the embedding and chat models.",
      "Documents are chunked and loaded once; queries run against the vector database.",
      "Search is exposed as a small API; API keys stay in environment variables.",
    ],
  },
];
