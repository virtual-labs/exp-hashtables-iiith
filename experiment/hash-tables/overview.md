### Hash Tables Concept and Algorithm
<iframe src="https://youtu.be/_YF_3DZIdwQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

### Need of Hashing

   - It can be used to compare large amounts of data. We create the hashes for the data, store the hashes and later if we need to compare the data, we can simply compare the hashes.
   - Hashes can be used fir indexing data. They can be used in hash tables to point to the correct row. If we want to quickly find a record, we calculate the hash of the data and directly go to the record where the corresponding hash record is pointing to (this assumes that you have a sorted list of hashes that point to the actual records).
   - They can be used in cryptographic applications like digital signatures.
   - Hashing can be used to generate seemingly random strings.

### Hashing Basics

   - Hashing is the process of mapping large number of data items to a smaller table with the help of hashing function.
   - It is a technique to convert a range of key values into a range of indexes of an array.
   - Hashing allows to update and retrieve any data entry in a constant time O(1).

### Real World Examples


In the following examples, elements are hashed to unique numbers which are similar to keys

   - In universities, each student is assigned a unique roll number that can be used to retrieve information about them.
   - In libraries, each book is assigned a unique number that can be used to determine information about the book, such as its exact position in the library, the users it has been issued to etc.
   - Different digits in a pin code help point out to a region, sub-region and so on.

### Hashing Functions

A hash function is any function that can be used to map a data set of an arbitrary size to a data set of a fixed size, which falls into the hash table. The values returned by a hash function are called hash values, hash codes, hash sums, or simply hashes. Hash functions are used to convert keys to hashes which can later be mapped to hash table array.
hash = hashfunc(key)
index = hash % array_size
For example: Hash Function can map strings to sum of their ascii characters and numbers to themselves.



