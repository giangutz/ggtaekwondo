import React from "react";
import { getUserMetadata } from "@/lib/utils";
import { getChildrenByParentId } from "@/lib/actions/user.actions";
import { HoverEffect } from "@/components/ui/card-hover-effect";

const page = async () => {
  let children;
  let selectedId: any;
  try {
    const user = getUserMetadata();

    if (!user || !user.userId) {
      throw new Error("Invalid user or user ID");
    }

    children = await getChildrenByParentId(user.userId);
    // match format of hovereffect component with children
    children = children.map((child: any) => ({
      title: child.firstName + " " + child.lastName,
      description: child.username,
      link: `/dashboard/${child._id}`,
      src: child.photo,
    }));

    selectedId = children[0]._id; // Assuming the first child is selected by default

    // Continue processing with `user` and `children`...
  } catch (error) {
    console.error("Failed to fetch user or children:", error);
    // Handle the error appropriately...
  }
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex flex-col items-center justify-center sm:justify-between text-center sm:text-left">
          <h3 className="h3-bold">Your Children</h3>
          <div>
            <p>
              Select your children to view their package details,
              attendance, and transaction records.
            </p>
          </div>
        </div>
      </section>

      <div className="wrapper">
        <HoverEffect items={children} />
      </div>
    </>
  );
};

export default page;
