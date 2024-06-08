import './App.css';

function App() {
  return (
    printSomething("Hello World")
  );
}

function printSomething(something: string){
  console.log(something)
  return (
    <h1>{something}</h1>
  )
}


export default App;
