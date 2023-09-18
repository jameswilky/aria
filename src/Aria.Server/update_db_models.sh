#!/bin/bash
dotnet ef dbcontext scaffold "Data Source=../db/aria.db" Microsoft.EntityFrameworkCore.Sqlite -o Services/Database/Models --verbose --force