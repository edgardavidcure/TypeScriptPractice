
function App() {
  return (
    <main className='bg-light-orange h-svh flex items-center justify-center'>
      {printSomething("Hello World")}
    </main>
  );
}

function printSomething(something: string){
  console.log(something)
  return (
    <h1 className='text-black text-5xl'>{something}</h1>
  )
}


export default App;
