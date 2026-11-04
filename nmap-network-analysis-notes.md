# Network Analysis with Nmap

## Project overview
This project introduces network discovery, TCP port states, service identification, and basic defensive network analysis. The companion `nmap-simulator.html` page is a browser-only educational simulation.

## What is Nmap?
Nmap (Network Mapper) is an open-source utility used for network discovery and security auditing. Administrators use it to inventory hosts, identify exposed services, and validate network controls.

## Common scan options

| Option | Purpose |
|---|---|
| `-sn` | Host discovery without a port scan |
| `-sS` | TCP SYN scan |
| `-sV` | Probe open ports to identify service/version information |
| `-O` | Attempt operating-system detection |
| `-p 22,80,443` | Select specific TCP ports |

## Understanding port states
- **Open:** an application is accepting connections on the port.
- **Closed:** the host is reachable, but no application is listening there.
- **Filtered:** a firewall or network obstacle prevents Nmap from determining whether the port is open.
- **Open|filtered / closed|filtered:** Nmap cannot distinguish the relevant states based on the responses it received.

An open port is not automatically a vulnerability. Review the service, its configuration, exposure, and patch status.

## Example workflow (authorized lab only)
1. Define the systems and IP ranges you are authorized to assess.
2. Start with host discovery to identify reachable lab systems.
3. Scan only the ports required for the assessment.
4. Use service detection to understand what is listening.
5. Verify findings with system owners and configuration records.
6. Document evidence, risk, and remediation recommendations.

## Security and ethics
Only scan systems you own or have explicit permission to assess. Follow organizational rules, scope limits, and applicable law. Avoid scanning public or third-party systems without authorization.

## About the browser simulator
The portfolio demo uses reserved documentation IP addresses (192.0.2.0/24, 198.51.100.0/24, and 203.0.113.0/24) and prewritten sample results. It does **not** execute Nmap, send packets, contact targets, or perform real network scans.

## Official resources
- [Nmap Reference Guide](https://nmap.org/book/man.html)
- [Nmap Official Site](https://nmap.org/)

---
Educational portfolio project · Network Analysis with Nmap
