# Stone King 1 Database conversion.

This directory demonstrates the method I used to translate the AS2 factory data into usable SQL Express database data for consumption by our API.

# Instructions to get the database loaded with the parsed data.

This requires node (and fs), and for SQLExpress to be running.

Parse the AS2 factory pattern into importable JSON files.

```cmd
.\ParseGetObjectData.bat
```

Import the JSON files as new tables into our SQLExpress server.
```cmd
.\ImportJSONToSQLExpress.bat
```