function stringify(obj, depth, printing) {
  return JSON.stringify(fixStringify(obj, depth, printing))
}

function fixStringify(obj, depth, printing) {
  if(obj==undefined) {return {}}
  if(depth==undefined) {depth=10}
  if(printing==undefined) {printing}
  let broken = removeBroken(obj, String(obj), "", depth, printing)
  if(broken[0]) {
    return {}
  } else {
    return broken[1]
  }
}

function removeBroken(obj, name, prefix, depth, printing) {
  type = typeof obj
  if(type=='object') {
    if(isBroken(obj)) {
      if(!hasBrokenChilds(obj)) {
        log(1, prefix, name, printing)
        return [true]
      } else if(depth==0) {
        log(3, prefix, name, printing)
        return [true]
      } else {
        log(7, prefix, name, printing)
        let newobj = obj
        for(var x in obj) {
          let broken = removeBroken(obj[x], x, prefix + "  ", depth-1, printing)
          if(broken[0]) {
            delete newobj[x]
          }
        }
        return [false, newobj]
      }
    } else {
      return [false, obj]
    }
  } else {
    if(isBroken(obj)) {
      log(1, prefix, name, printing)
      return [true]
    } else {
      return [false, obj]
    }
  }
}

function log(color, prefix, name, printing) {
  if(printing) {
    console.log('\x1b[3'+color+'m%s\x1b[0m', prefix + name)
  }
}

function hasBrokenChilds(obj) {
  for(var x in obj) {
    try {
      JSON.stringify(obj[x])}
    catch(error) {
      return true}}
  return false
}

function isBroken(obj) {
  try {
    JSON.stringify(obj)
    return false}
  catch(error) {
    return true}
}

module.exports.stringify = stringify
module.exports.fixStringify = fixStringify
module.exports.isBroken = isBroken
module.exports.hasBrokenChilds = hasBrokenChilds
