---
sidebar_position: 3
---

# Run the Application

1. **Open IntelliJ IDEA** → File → Open → Select the unzipped project folder.
2. **First-Time JDK Setup** (if prompted):
   * IntelliJ will ask you to download a JDK. Choose the **same version** you selected in Spring Initializr (e.g., Java 21).
   * Click Download JDK and follow the prompts.
3. **Wait for Background Tasks**:
   * Look for progress indicators in the **lower-right corner** (e.g., "Downloading Gradle dependencies" or "Indexing").
   * **Let these finish** – they set up your project’s tools and libraries.
4. **Run the Application**:
   * Navigate to the main class: `src/main/java/dev/pollito/UsersManagerApplication.java`. Right-click the class → Run `UsersManagerApplication.main()`.
    
   <div>
      <img src={require('@site/static/img/lets-create-a-spring-boot-project/main.png').default} alt="main" />
   </div>

5. **Check the Run Terminal**:
   * After a few seconds, you’ll see something similar to `Started UsersManagerApplication in 2.262 seconds (process running for 2.568)`.
   * This means your Spring Boot app is live!
6. **Test it out**:
   * Open your browser and go to [http://localhost:8080/](http://localhost:8080/).
   * You’ll see a Whitelabel Error Page – this is normal as we haven’t done any development yet.

<div>
   <img src={require('@site/static/img/lets-create-a-spring-boot-project/whitelabel.png').default} alt="whitelabel" />
</div>

Congratulations! Your Spring Boot app is up and running – and here’s why this is a big deal:

**Before Spring Boot**, getting a Java app to listen on a port like 8080 required hours of manual setup:

* Configuring `XML` files (like `web.xml`).
* Deploying `WAR` files to an external server (e.g., Tomcat).
* Writing boilerplate code just to start the server.

**Today, with Spring Boot**:

* The embedded Tomcat server starts automatically.
* Zero code needed – the `main()` method does everything.
* No `XML` or manual server setup.

You just witnessed Spring Boot’s magic: turning what used to be a days-long chore into a 10-second task. And we haven’t even written a single line of our own code yet!
