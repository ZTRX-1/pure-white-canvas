import { createFileRoute, Outlet } from "@tanstack/react-router";
export const Route = createFileRoute("/unidades")({ component: UnidadesLayout });
function UnidadesLayout() { return <Outlet />; }
