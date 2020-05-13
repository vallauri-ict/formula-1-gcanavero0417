# Formula One Project

_Canavero Gianni - 5B INF_

The solution is based on a complex database representing the whole Formula1's 2019 championship.<br>
It provides a simple desktop crud and more complex WebApi structure for the display of the data.<br>

Based on Visual Studio 2017 platform, the desktop application are done with [C#](https://docs.microsoft.com/dotnet/csharp/).<br>
The webpage of the fifth project works with [jQuery](https://api.jquery.com/).<br>
The DB is done with [SQL Server](https://docs.microsoft.com/sql/sql-server/?view=sql-server-ver15).<br>

# Projects

### Project 1 - FormulaOneBatchConsole Project

C# console application to create and restore the DB.

### Project 2 - FormulaOneDll

C# library for the DB connection, providing classes for every table and queries for the DB.

### Project 3 - FormulaOneCrudForm

C# form that works as a simple crud.

### Project 4 - FormulaOneWebForm

ASPX.NET webpage that just shows the tables.

### Project 5 - FormulaOneWebApi

The core of the whole solution, with a complex C# Web Api 2.0 that returns data from the DB with several [routes and DTOs](https://github.com/vallauri-ict/formula-1-gcanavero0417/blob/master/WEBSERVICES.md)<br>
The FormulaOneWebApi contains also a webpage where you can see the majority of the Formula1 DB.
![Preview](https://github.com/vallauri-ict/formula-1-gcanavero0417/blob/master/site-preview.png?raw=true)

---
# Database Diagram

![Preview](https://github.com/vallauri-ict/formula-1-gcanavero0417/blob/master/db-diagram.png?raw=true)