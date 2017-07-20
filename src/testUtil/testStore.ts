import { AutoSubscribeStore, autoSubscribeWithKey, StoreBase } from "resub"
import { IPersistableStore } from "../type"

const TestStoreTriggers = {
  ChangeMyBool: 3,
  ChangeMyString: 6
}

@AutoSubscribeStore
class TestStore1 extends StoreBase implements IPersistableStore {
  public name = "detailList"
  private myBool: boolean = false
  private myString: string = ""

  public getPropKeys() { return ["myBool", "myString"] }

  public toggleMyBool() {
    this.myBool = !this.myBool
    this.trigger(TestStoreTriggers.ChangeMyBool)
  }

  public setMyString(newString: string) {
    this.myString = newString
    this.trigger(TestStoreTriggers.ChangeMyString)
  }

  @autoSubscribeWithKey(TestStoreTriggers.ChangeMyBool)
  public isMyBool() {
    return this.myBool
  }

  @autoSubscribeWithKey(TestStoreTriggers.ChangeMyString)
  public isMyString() {
    return this.myString
  }

}

export { TestStore1 }
export default new TestStore1()
