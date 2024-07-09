from fastapi import FastAPI, HTTPException
import mysql.connector
from config import DB_CONFIG
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

def execute_query(query, params=None, fetch=False):
    try:
        # Connect to the database
        connection = mysql.connector.connect(**DB_CONFIG)
        if connection.is_connected():
            cursor = connection.cursor()

            # Execute the SQL query with optional parameters
            if params:
                cursor.execute(query, params)
            else:
                cursor.execute(query)

            if fetch:
                column_names = [column[0] for column in cursor.description]

                # Fetch all rows if needed
                records = cursor.fetchall()
                # Construct a list of dictionaries with column names as keys
                customers = [{column_names[i]: row[i] for i in range(len(column_names))} for row in records]
                return customers
            else:
                # Commit the transaction if not fetching data
                connection.commit()
                return {"message": "Query executed successfully."}

    except mysql.connector.Error as e:
        print("Error while executing MySQL query:", e)
        raise HTTPException(status_code=500, detail="Error executing query")

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")


@app.get("/costumers")
def get_customers():
    query = "SELECT * FROM mydb.providers;"
    customers = execute_query(query, fetch=True)
    if customers:
        return {"table": customers}
    else:
        return {"message": "Failed to fetch customers"}
@app.get("/product")
def get_customers():
    # Fetch customers data
    query = "SELECT * FROM mydb.product;"
    customers = execute_query(query, fetch=True)
    return {"table": customers}
class Customer(BaseModel):
    name: str
    mail: str
    phone: str

@app.post("/input")
def create_customer(customer: Customer):
    try:
        query = "INSERT INTO `mydb`.`providers` (`name`, `email`, `phone`) VALUES (%s, %s, %s);"
        params = (customer.name, customer.mail, customer.phone)
        execute_query(query, params)
        return {"message": "Customer created successfully."}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error creating customer")

class Product(BaseModel):
    id: str
    name: str
    provider: str

@app.post("/input_product")
def create_product(products: list[Product]):
    try:
        for product in products:
            query = "INSERT INTO `mydb`.`product` (`id`, `name`, `provider`) VALUES (%s, %s, %s);"
            params = (product.id, product.name, product.provider)
            execute_query(query, params)
        return {"message": "Products created successfully."}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error creating products")
    

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)
