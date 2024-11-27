import React, { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import MailList from "./mail-list";
import { mails } from "./data";
import { usePathname } from "next/navigation";
import { getTitle } from "@/helpers/path";
import FilterMail from "./filter-mail";
import MailDisplay from "./mail-display";
import { Separator } from "../ui/separator";
import { MailContext } from "@/app/(home)/dashboard/(mail)/layout";
import { useSelector } from "@xstate/react";

interface MailProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
}

export default function Mail({ defaultLayout = [20, 32, 48] }: MailProps) {
  const path = usePathname();
  const mailActor = MailContext.useActorRef();
  const mailState = useSelector(mailActor, (s) => s.context);

  const pageTitle = getTitle(path);

  const [filter, setFilter] = useState("all");

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizeable-panels:layout:mail=${JSON.stringify(
          sizes
        )}`;
      }}
      className="h-full max-h-[900px] items-stretch"
    >
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        <div className="flex items-center px-4 py-2 justify-between">
          <h4 className="text-2xl font-bold">{pageTitle}</h4>
          <FilterMail value={filter} setValue={setFilter} />
        </div>
        <Separator />
        <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <form className="mt-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search" className="pl-8" />
            </div>
          </form>
        </div>
        <MailList items={mails} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
        <MailDisplay
          mail={mails.find((item) => item.id === mailState.mailId) || null}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
