import { FlexRentProvider } from "./context/FlexRentProvider";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <>
      <FlexRentProvider>
        <AppRoutes />
      </FlexRentProvider>
    </>
  );
}

export default App;
