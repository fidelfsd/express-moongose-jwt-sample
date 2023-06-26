#############################################################

# crear la base de datos
sequelize db:create


# crear modelo Nationality
sequelize model:generate --name Nationality --attributes 'nation:string'

# crear modelo Address
sequelize model:generate --name Address --attributes 'street:string,num:integer'

#crear modelo Category
sequelize model:generate --name Category --attributes 'category:string'

#crear modelo Role
sequelize model:generate --name Role --attributes 'role:string'

# crear modelo User
sequelize model:generate --name User --attributes 'user_name:string,user_last_name:string,birthday:date,email:string,password:string,id_role:integer'

# crear modelo Student
sequelize model:generate --name Student --attributes 'active:enum:{yes,no},id_nationality:integer,id_address:integer,id_user:integer'

# crear modelo Course
sequelize model:generate --name Course --attributes 'course_name:string,id_category:integer'

# las tablas intermedias en una relacion N:N no llevan modelo, pero si llevan migracion


#############################################################

# ejecutar migracion
sequelize db:migrate
sequelize db:migrate --to 01-create-student.js

# revertir migracion
sequelize db:migrate:undo
sequelize db:migrate:undo:all

# crear seed
sequelize seed:generate --name seed-student

# ejecutar seed
sequelize db:seed:all
sequelize db:seed --seed 01-seed-student.js