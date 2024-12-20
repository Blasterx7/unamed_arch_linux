# Services folder

This place is probably the place i love the most. It's the place where i put all the services that are used in the project. But first, what is a service ? A service is a class that is used to perform a specific task or set of tasks. 

For example, a service might be used to fetch data from an API, manage state, or perform calculations. Services are typically used to encapsulate logic that is shared across multiple components or modules.

It Ashborn arch, services are used like module in a computer. They are used to manage the data and the logic of the project.

But services comparing to server actions provided by nuxtjs are not used to fetch data from an API. They are used to manage the data and the logic of the project. Although, they can be used to fetch data from an API, but it's not their main purpose.

For example, the `TerminalService` is used to manage the terminal and the commands that are executed in the terminal. The `AppService` is used to manage the apps that are installed on the system. The `SettingsService` is used to manage the settings of the system. 

Note that in case of AppService, all app are stored in a database, shared between all users.

If you are a contributor, you can add your own services to this folder to extend the functionality of the project.

~Thanks you !