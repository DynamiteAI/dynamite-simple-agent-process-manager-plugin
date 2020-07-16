# Simple Process Manager

Simple process manager is a very basic manager for controlling various agent components: Zeek, Suricata, and FileBeat. It can be installed on any [dynamite-nsm agent (>= 0.7.2)](https://github.com/DynamiteAI/dynamite-nsm/releases).


<img src="https://github.com/DynamiteAI/dynamite-simple-agent-process-manager-plugin/raw/master/simple-process-manager.png">


## Prerequisites

### Install Dynamite Agent UI

1. Download the latest version of [dynamite-nsm](https://github.com/DynamiteAI/dynamite-nsm).

    `pip install dynamite-nsm`
    
2. Install the [dynamite-agent](https://dynamite-nsm.readthedocs.io/en/latest/getting_started/agent_setup/).

    `dynamite agent install dynamite agent install --analyzers zeek suricata --capture-interface mon0 --targets $LOGSTASH_SERVER:5044`
3. When prompted, enable the **Agent Web UI**.

4. Start the agent.

    `dynamite agent start`
    
## Installation
Simple agent process manager can be installed through the agent plugin-manager. Simply upload the zip archive.
