
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Trash2, User, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface Contact {
  id: string;
  name: string;
  phone: string;
}

export function EmergencyContacts() {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: "1", name: "Mom", phone: "+1 (555) 123-4567" },
    { id: "2", name: "Dad", phone: "+1 (555) 987-6543" }
  ]);
  const [newContact, setNewContact] = useState({ name: "", phone: "" });
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();

  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone) {
      toast({
        title: "Missing information",
        description: "Please provide both name and phone number.",
        variant: "destructive",
      });
      return;
    }

    setContacts([...contacts, { ...newContact, id: Date.now().toString() }]);
    setNewContact({ name: "", phone: "" });
    setIsAdding(false);
    
    toast({
      title: "Contact added",
      description: `${newContact.name} has been added to your emergency contacts.`,
    });
  };

  const handleRemoveContact = (id: string) => {
    const contactToRemove = contacts.find(c => c.id === id);
    setContacts(contacts.filter(contact => contact.id !== id));
    
    toast({
      title: "Contact removed",
      description: `${contactToRemove?.name} has been removed from your emergency contacts.`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Emergency Contacts</h3>
        {!isAdding && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-safeher-600 hover:text-safeher-700 hover:bg-safeher-50"
            onClick={() => setIsAdding(true)}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Contact
          </Button>
        )}
      </div>
      
      <div className="space-y-3">
        <AnimatePresence>
          {contacts.map(contact => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center p-3 rounded-md border bg-card"
            >
              <div className="w-10 h-10 rounded-full bg-safeher-100 flex items-center justify-center mr-3">
                <User className="h-5 w-5 text-safeher-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{contact.name}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="h-3 w-3 mr-1" />
                  {contact.phone}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-destructive"
                onClick={() => handleRemoveContact(contact.id)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove {contact.name}</span>
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
        
        <AnimatePresence>
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-3 p-3 rounded-md border border-dashed"
            >
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Contact name"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  placeholder="+1 (555) 123-4567"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setIsAdding(false);
                    setNewContact({ name: "", phone: "" });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-safeher-600 hover:bg-safeher-700"
                  onClick={handleAddContact}
                >
                  Save Contact
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {contacts.length === 0 && !isAdding && (
          <div className="text-center p-6 border border-dashed rounded-md">
            <p className="text-muted-foreground">No emergency contacts added yet.</p>
            <Button
              variant="link"
              className="text-safeher-600 mt-2"
              onClick={() => setIsAdding(true)}
            >
              Add your first contact
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
