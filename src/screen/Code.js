import React, { Component, useEffect,useState} from 'react';
import { View, Text ,Button} from 'react-native';

const  Code =()=> {
    const [count, setCount] = useState(0);
   useEffect(() => {
    // Update the document title using the browser API
    console.log(count)
  });
  return (
    <>
      <Button title="123" onPress={() => setCount(count + 1)}>
      </Button>
      <Text>You clicked {count}times</Text>
    </>
  );
}

export default Code;
