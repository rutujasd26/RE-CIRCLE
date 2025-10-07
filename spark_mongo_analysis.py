from pyspark.sql import SparkSession
from pyspark.sql.functions import avg

# Initialize Spark session with MongoDB configurations and set log level to ERROR
spark = SparkSession.builder \
    .appName("ProductAnalysis") \
    .config("spark.mongodb.input.uri", "mongodb://localhost:27017/rentit.products") \
    .config("spark.mongodb.output.uri", "mongodb://localhost:27017/rentit.products") \
    .getOrCreate()

# Set the log level to ERROR to reduce output noise
spark.sparkContext.setLogLevel("ERROR")

# Load the products collection from MongoDB
products_df = spark.read.format("mongo").load()

# Show the schema to verify the data structure (optional)
products_df.printSchema()

# Calculate the average price per day per category, dropping rows with NULL in 'price_per_day'
average_price_per_category = products_df.filter(products_df.price_per_day.isNotNull()) \
    .groupBy("category") \
    .agg(avg("price_per_day").alias("average_price"))

# Show the average price per category
average_price_per_category.show()

# Filter for available products and drop rows with NULL values in critical fields
available_products = products_df.filter(products_df.availability == True) \
    .na.drop(subset=["_id", "category", "description", "image", "name", "price_per_day"])

# Show the available products with required fields
available_products.select("_id", "availability", "category", "description", "image", "name", "price_per_day").show(5, truncate=False)

# Stop the Spark session when done
spark.stop()
