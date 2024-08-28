import Navbar from "../components/Navbar";

function InventarioPage() {
    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Inventario</h1>
                {/*<InventarioTable />*/}
            </div>
        </div>
    );
}

export default InventarioPage;