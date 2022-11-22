:: ImportJSONToSQLExpress.bat
::
:: Grabs the JSON files from parser-output directory and creates new tables in our
:: running SQLExpress server.
::
:: This expects the SQLExpress server to be running (accessbile via sqlcmd) on this machine.

@REM https://learn.microsoft.com/en-us/sql/relational-databases/json/import-json-documents-into-sql-server?view=sql-server-ver16

@REM TODO: build the model for our tables. Once db set, build MVC in API & Angular frontend
@REM SELECT npc.*
@REM  FROM OPENROWSET (BULK '%mypath%\npc.json', SINGLE_CLOB) as j
@REM  CROSS APPLY OPENJSON(BulkColumn)
@REM  WITH( id nvarchar(100), name nvarchar(100), price float,
@REM  pages_i int, author nvarchar(100)) AS book

:: Create StoneKing database
@REM sqlcmd -S localhost\sqlexpress -Q "CREATE DATABASE StoneKing"

:: 
@REM sqlcmd -S localhost\sqlexpress -d StoneKing -q "SELECT 1"

SET mypath=%~dp0
SET mypath=%mypath:~0,-1%
echo %mypath%