import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { LandingPageFlexbot } from "@/pages/LandingPageFlexbot";
import { BugPage } from "@/pages/BugPage";
import { ProjetoPage } from "@/pages/ProjetoPage";
import { ChamadoPage } from "@/pages/ChamadoPage";
import { MelhoriaPage } from "@/pages/MelhoriaPage";
import { TicketWizard } from "@/pages/TicketWizard";

function Router() {
  return (
    <Switch>
      {/* Add pages below */}
      <Route path="/" component={LandingPageFlexbot} />
      <Route path="/bug" component={BugPage} />
      <Route path="/projeto" component={ProjetoPage} />
      <Route path="/chamado" component={ChamadoPage} />
      <Route path="/melhoria" component={MelhoriaPage} />
      <Route path="/melhoria/ticket" component={TicketWizard} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
