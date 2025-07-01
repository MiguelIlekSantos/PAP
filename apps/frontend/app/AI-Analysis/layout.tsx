import { Nav } from '../components/Nav';
import { DrawerMenu } from '../components/DrawerMenu';

export default function AIAnalysisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <DrawerMenu page="ai-analysis" />
      <main className="ml-20">{children}</main>
    </div>
  );
}