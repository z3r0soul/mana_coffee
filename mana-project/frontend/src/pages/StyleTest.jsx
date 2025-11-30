export default function StyleTest() {
  /* return (
     <div className="space-y-6 p-8">
 
       <h2 className="section-title">Probando estilos</h2>
 
       <button className="btn-primary">Botón primario</button>
 
       <button className="btn-secondary">Botón secundario</button>
 
       <div className="card p-6">
         <p className="line-clamp-2">
           Large text for testing if the line-clamp-2 works properly by the stablished properties on index html.....
         </p>
       </div>
 
       <h1 className="text-gradient text-5xl font-bold animate-float">
         Animation gradient text
       </h1>
 
     </div>
   );
 }*/
  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Tailwind Test
      </h1>

      <button className="px-5 py-2 bg-green-600 text-white rounded-lg shadow">
        Botón Verde
      </button>

      <button className="px-5 py-2 bg-red-600 text-white rounded-lg shadow ml-4">
        Botón Rojo
      </button>
    </div>
  );
}
